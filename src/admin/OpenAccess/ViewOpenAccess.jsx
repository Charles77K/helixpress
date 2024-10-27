import { useFetchOpenAccess } from '../components/Tanstack';
import GenericView from '../components/GenericView';

export default function ViewOpenAccess() {
  const { openAccessData, isOpenAccessError, isOpenAccessLoading } =
    useFetchOpenAccess();
  return (
    <div>
      <GenericView
        genericData={openAccessData}
        genericDataError={isOpenAccessError}
        genericDataLoading={isOpenAccessLoading}
        label={'Open-Access'}
      />
    </div>
  );
}
