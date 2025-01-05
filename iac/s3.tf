resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "prod-frontend-bucket21312321"
  acl    = "private"  
  tags = {
    "environment" = "production"
  }

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_object" "frontend_object" {
  for_each = fileset("${path.module}/../frontend/build", "**/*")

  bucket       = aws_s3_bucket.frontend_bucket.id
  key          = each.value
  source       = "${path.module}/../frontend/build/${each.value}"
  acl          = "public-read"  
  etag         = filemd5("${path.module}/../frontend/build/${each.value}")

  content_type = lookup({
    "html" = "text/html",
    "css"  = "text/css",
    "js"   = "application/javascript",
    "json" = "application/json",
    "png"  = "image/png",
    "jpg"  = "image/jpeg",
    "jpeg" = "image/jpeg",
    "svg"  = "image/svg+xml",
    "woff" = "font/woff",
    "woff2" = "font/woff2",
    "ttf"  = "font/ttf",
    "otf"  = "font/otf",
    "ico"  = "image/x-icon",
    "eot"  = "application/vnd.ms-fontobject"
  }, length(split(".", each.value)) > 1 ? split(".", each.value)[length(split(".", each.value)) - 1] : "txt", "application/octet-stream")

}

resource "aws_s3_bucket_public_access_block" "frontend_bucket_block" {
  bucket = aws_s3_bucket.frontend_bucket.id

  block_public_acls       = false  # Allow public read on objects
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

# Ensure the objects are owned by the uploader to avoid access issues
resource "aws_s3_bucket_ownership_controls" "s3_bucket_acl_ownership" {
  bucket = aws_s3_bucket.frontend_bucket.id
  rule {
    object_ownership = "ObjectWriter"
  }
}

# Set bucket policy to allow public read on objects
resource "aws_s3_bucket_policy" "frontend_bucket_policy" {
  bucket = aws_s3_bucket.frontend_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement: [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.frontend_bucket.arn}/*"
      }
    ]
  })
}