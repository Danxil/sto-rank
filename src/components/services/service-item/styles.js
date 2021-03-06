import { css } from '@emotion/core'
import { BLUE_COLOR, GREEN_COLOR, ORANGE_COLOR } from '../../../constants/colors'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../../constants/layout'

export default {
  label: {
    fontWeight: 'bold',
  },
  listItemWithoutBorder: {
    border: 'none',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 10,
  },
  line: css`
    margin-bottom: 20px;
  `,
  servicesLine: css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 10px;
  `,
  questionWarning: {
    fontSize: 50,
    color: 'gray',
  },
  infoText: {
    fontWeight: 'bold',
    maxWidth: 300,
    alignSelf: 'flex-end',
    fontSize: 12,
  },
  warningText: {
    color: ORANGE_COLOR,
  },
  successText: {
    color: GREEN_COLOR,
  },
  blockWrapper: css`
    display: flex;
    justifyContent: space-between;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      flex-direction: column-reverse;
    }
  `,
  rankBlock: css`
    width: 60%;
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      width: 100%;
      align-items: flex-start;
    }
  `,
  descriptionBlock: css`
    width: 40%;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      width: 100%;
    }
  `,
  detailsBtn: {
    color: BLUE_COLOR,
    paddingVertical: 5,
    width: '100%',
    display: 'inline-block',
  },
  showOnMapBtn: {
    color: BLUE_COLOR,
    fontWeight: 'bold',
    paddingVertical: 5,
    display: 'inline-block',
  },
  sideLinksWrapper: css`
    margin-top: 20px;
    max-width: 300px;
    padding-bottom: 20px;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      text-align: left;
    }
  `,
  sideLinksTitle: {
  },
  sideLink: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 12,
    marginTop: 10,
  },
  cardTitle: css`
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      font-size: 18px;
    }
  `,
  contactBtn: css`
    font-weight: bold;
    color: ${BLUE_COLOR} !important;
  `,
  point: css`
    margin-bottom: 50px;
  `,
  cardTitleText: css`
    max-width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  pointTitle: css`
    font-size: 15px;
  `,
  expandIcon: css`
    font-size: 20px;
    margin-top: 20px;
  `,
  pointItemLine: css`
    margin-top: 30px;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      margin-top: 20px;
    }
  `,
  expandIconWrapper: css`
    text-align: center;
    display: none;
     @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      display: block;
    }
  `,
  showHideSpecialities: css`
    padding-left: 0px;
    margin-top: 10px;
  `
}
