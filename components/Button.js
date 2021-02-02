import style from '../styles/Button.module.scss';

const Button = (props) => {

  const colorClass = () => {
    return props.color === 'highlight' ? style.ax_btn_highlight : style.ax_btn_base;
  }

  const centeredClass = () => {
    return props.isCentered ? style.ax_btn_centered : '';
  }

  const wideClass = () => {
    return props.isWide ? style.ax_btn_wide : '';
  }

  const blank = () => {
    return props.blank ? '_blank' : '_self';
  }

  const sizeClass = () => {
    switch (props.sizing) {
      case 'small': return style.ax_btn_small;
      case 'medium': return style.ax_btn_medium;
      case 'large': return style.ax_btn_large;
      case 'xlarge': return style.ax_btn_xlarge;
      default: return style.ax_btn_medium;
    }
  }

  if (props.isLink) {
    return (
      <a href={props.linkPath} className={`${style.ax_btn} ${sizeClass()} ${colorClass()} ${centeredClass()} ${wideClass()}}`} target={blank()}>{props.label}</a>
    )
  }
  return <button className={`${style.ax_btn} ${sizeClass()} ${colorClass()} ${centeredClass()} ${wideClass()}}`}>{props.label}</button>
}

export default Button;
