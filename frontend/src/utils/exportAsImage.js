import html2canvas from "html2canvas";

export const exportAsImage = async (element) => {
const canvas = await html2canvas(element);
return canvas.toDataURL('/image/jpeg',0.95);
};