import Button from '../Button/Button';

export default function Navigation() {
  return (
    <div className="navigation">
      <Button className="button__navigation button__navigation_main">Main</Button>
      <Button className="button__navigation button__navigation_active">Films</Button>
      <Button className="button__navigation">Saved films</Button>
    </div>
  );
}
