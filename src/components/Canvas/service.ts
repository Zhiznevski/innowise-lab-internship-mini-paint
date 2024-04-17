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
