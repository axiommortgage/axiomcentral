import Link from 'next/link'
import style from '../styles/Button.module.scss'

const Button = (props) => {
  const { sizing, isLink, linkPath, label, color, isCentered, isWide, blank } = props

  const colorClass = () => (color === 'highlight' ? style.ax_btn_highlight : style.ax_btn_base)

  const centeredClass = () => (isCentered ? style.ax_btn_centered : '')

  const wideClass = () => (isWide ? style.ax_btn_wide : '')

  const blankTarget = () => (blank ? '_blank' : '_self')

  const sizeClass = () => {
    switch (sizing) {
      case 'small':
        return style.ax_btn_small
      case 'medium':
        return style.ax_btn_medium
      case 'large':
        return style.ax_btn_large
      case 'xlarge':
        return style.ax_btn_xlarge
      default:
        return style.ax_btn_medium
    }
  }

  if (isLink) {
    return (
      <Link href={linkPath}>
        <a
          className={`${style.ax_btn} ${sizeClass()} ${colorClass()} ${centeredClass()} ${wideClass()}}`}
          target={blankTarget()}
        >
          {label}
        </a>
      </Link>
    )
  }
  return (
    <button
      type="button"
      className={`${style.ax_btn} ${sizeClass()} ${colorClass()} ${centeredClass()} ${wideClass()}}`}
    >
      {label}
    </button>
  )
}

export default Button
