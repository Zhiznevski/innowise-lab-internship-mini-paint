import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/config';
import { ImageListItemType } from '../../components/ImageGallery/ImageGallery';

function useSearchByValue(collectionName: string, searchValue: string) {
  const imagesRef = collection(db, collectionName);
  const [searchResults, setSearchResults] = useState<ImageListItemType[]>([]);

  useEffect(() => {
    function getImageData() {
      const q = query(
        imagesRef,
        where('userName', '>=', searchValue),
        where('userName', '<=', searchValue + '\uf8ff')
      );
      onSnapshot(q, (querySnapshot) => {
        const images: ImageListItemType[] = [];
        querySnapshot.forEach((doc) => {
          images.push(doc.data() as ImageListItemType);
        });
        setSearchResults(images);
      });
    }
    getImageData();
  }, [searchValue, imagesRef]);
  return searchResults;
}
export default useSearchByValue;
