import { useParams } from 'react-router-dom';

export default function CurrentNews() {
  const { id } = useParams();
  return (
    <div>
      <p>Hiiiii</p>
    </div>
  );
}
