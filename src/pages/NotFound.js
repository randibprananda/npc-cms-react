import NotFoundImage from '../assets/images/404.png';

const NotFound = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen overflow-hidden'>
      <img src={NotFoundImage} />
    </div>
  );
};

export default NotFound;
