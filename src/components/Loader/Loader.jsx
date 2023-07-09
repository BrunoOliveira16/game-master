// Styles
import './loader.scss';

const Loader = () => {
  return (
    <div className='loader text-center'>
        <div className='loader-spin'></div>
        <p>...Carregando</p>
    </div>
  );
};

export default Loader;