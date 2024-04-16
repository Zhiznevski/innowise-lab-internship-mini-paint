export function drawLine(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  counterclockwise?: boolean | undefined
) => {
  ctx.beginPath();
  ctx.arc(startX, startY, radius, startAngle, endAngle, counterclockwise);
  ctx.stroke();
};

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number
) => {
  ctx.fillRect(startX, startY, width, height);
};

export async function getImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching image from ${url}: ${response.status} ${response.statusText}`);
      return null;
    }

    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise<string>((resolve, reject) => {
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read image data.'));
        }
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching or processing image:', error);
    return null;
  }
}
