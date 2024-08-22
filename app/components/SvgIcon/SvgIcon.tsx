interface IProps {
  name: string;
  className?: string;
  fill?: string;
}

function SvgIcon(props: IProps) {
  const { name, className } = props;
  return (
    <svg width='1em' height='1em' aria-hidden="true" className={`${className}`}>
      <use xlinkHref={"#" + name} />
    </svg>
  );
}

export default SvgIcon;