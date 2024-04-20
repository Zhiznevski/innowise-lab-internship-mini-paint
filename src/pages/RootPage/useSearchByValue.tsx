import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/config';
import { ImageListItemType } from '../../components/ImageGallery/ImageGallery';

function useSearchByValue(collectionName: string, searchValue: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<ImageListItemType[]>([]);

  useEffect(() => {
    function getImageData() {
      setIsLoading(true);
      const q = query(
        collection(db, collectionName),
        where('userName', '>=', searchValue),
        where('userName', '<=', searchValue + '\uf8ff'),
        orderBy('createAt', 'desc')
      );
      onSnapshot(q, (querySnapshot) => {
        const images: ImageListItemType[] = [];
        querySnapshot.forEach((doc) => {
          images.push(doc.data() as ImageListItemType);
        });
        setSearchResults(images);
        setIsLoading(false);
        console.log('sucsess');
      });
    }
    getImageData();
  }, [searchValue, collectionName]);
  return [searchResults, isLoading] as const;
}
export default useSearchByValue;
