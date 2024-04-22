import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/config';
import { ImageListItemType } from '../../components/ImageGallery/ImageGallery';

function useSearchByValue(collectionName: string, searchValue: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [searchResults, setSearchResults] = useState<ImageListItemType[]>([]);

  useEffect(() => {
    let ignore = false;
    function getImageData() {
      try {
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
            images.push({
              ...doc.data(),
              itemId: doc.id,
            } as ImageListItemType);
          });
          if (!ignore) {
            setSearchResults(images);
            setIsLoading(false);
          }
        });
      } catch (e) {
        setError(e);
        console.error(e);
      }
    }
    getImageData();
    return () => {
      ignore = true;
    };
  }, [searchValue, collectionName]);
  return [searchResults, isLoading, error] as const;
}
export default useSearchByValue;
