import Moment from 'react-moment'
import style from '../styles/Card.module.scss'
import Button from './Button'

const CardWithIcon = (props) => {
  const {
    cardWide,
    icon,
    color,
    photo,
    iconSquared,
    title,
    description,
    hasButton,
    linkUrl,
    buttonLabel,
    openInBlank,
    clickEvent,
    date
  } = props

  const handleColor = () => {
    switch (color) {
      case 'purple':
        return style.purple
      case 'orange':
        return style.orange
      case 'blue':
        return style.blue
      case 'green':
        return style.green
      case 'grassgreen':
          return style.grassgreen
      case 'yellow':
        return style.yellow
      case 'teal':
        return style.teal
      default:
    }
  }

  const cardColor = handleColor()

  return (
    <div className={`${cardWide ? style.ax_card_wide : style.ax_card_vertical}`} onClick={clickEvent}>
      <div className={`${style.ax_card_with_icon} ${cardColor}`}>
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
          {date ? <p><Moment format="MMMM DD, YYYY">{date}</Moment></p> : ''}
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
