import './pageNotFound.scss';
import NotFound from 'assets/notFound.svg';

const PageNotFound = () => {
  return (
    <div className="notFound">
        <img src={NotFound} />
        <p>Ops! página não encotrada</p>
    </div>
  )
}

export default PageNotFound;