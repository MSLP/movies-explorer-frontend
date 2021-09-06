import './NotFound.css';
import Button from '../Button/Button';

export default function NotFound() {
  return (
    <div className="page404">
      <h2 className="page404__title">404</h2>
      <p className="page404__subtitle">Page does not exist</p>
      <Button className="page404__button">Back</Button>
    </div>
  );
}
