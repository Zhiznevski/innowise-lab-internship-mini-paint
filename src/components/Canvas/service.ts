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

export const imageUrlToBase64 = async (url: string): Promise<string | ArrayBuffer | null> => {
  const data = await fetch(url, {
    // mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
    reader.onerror = reject;
  });
};
