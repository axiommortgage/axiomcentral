import style from '../styles/Card.module.scss';
import Button from './Button';

const CardWithIcon = props => {
  return (
    <div className={`${props.cardWide ? style.ax_card_wide : style.ax_card_vertical}`}>
      <div className={`${style.ax_card_with_icon}`}>
        <div className={`${props.icon ? style.ax_card_icon : ''} ${props.iconSquared ? style.ax_card_icon_squared : ''} ${props.photo ? style.ax_card_photo : ''}`}>
          <img src={`${props.icon ? props.icon : ''} ${props.photo ? props.photo : ''} ${props.iconSquared ? props.iconSquared : ''}`} />
        </div>
        <div className={style.ax_card_body} style={{marginBottom: `${props.hasButton ? '32px': '  '} ` }}>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>

        {props.hasButton ? <Button sizing="small" color="highlight" isLink linkPath={props.linkUrl} label={props.buttonLabel} blank={props.openInBlank} /> : ''}
      </div>
    </div>
  )
}

export default CardWithIcon;