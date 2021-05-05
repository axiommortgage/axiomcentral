import style from '../styles/Card.module.scss'
import Button from './Button'

const CardWithIcon = (props) => {
  const { cardWide, icon, photo, iconSquared, title, description, hasButton, linkUrl, buttonLabel, openInBlank } = props

  return (
    <div className={`${cardWide ? style.ax_card_wide : style.ax_card_vertical}`}>
      <div className={`${style.ax_card_with_icon}`}>
        <div
          className={`${icon ? style.ax_card_icon : ''} ${iconSquared ? style.ax_card_icon_squared : ''} ${
            photo ? style.ax_card_photo : ''
          }`}
        >
          <img src={`${icon || ''} ${photo || ''} ${iconSquared || ''}`} alt="icon" />
        </div>
        <div className={style.ax_card_body} style={{ marginBottom: `${hasButton ? '32px' : '  '} ` }}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        {hasButton ? (
          <Button sizing="small" color="highlight" isLink linkPath={linkUrl} label={buttonLabel} blank={openInBlank} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default CardWithIcon
