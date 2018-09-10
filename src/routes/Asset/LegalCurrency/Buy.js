import React, { Component } from 'react'
import { connect } from 'dva'
import { PATH } from "@constants"
import { Mixin, Button, RouterGo } from '@components'
import { classNames, _, Patterns, } from '@utils'
import MoneySelect from '@routes/Asset/components/MoneySelect'
import Input from '@routes/Components/Input'

import styles from '@routes/Asset/index.less'

@connect(({ modal, asset, user, Loading }) => ({
  user,
  model: asset,
  modal,
  loading: Loading
}))
export default class View extends Component {
  state = {
    active: '',
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    this.getAssetSummary()
  }

  getAssetSummary = () => {
    const { dispatch, modelName } = this.props
    const { active } = this.state
    dispatch({
      type: `${modelName}/getAssetSummary`,
    }).then(res => {
      if (res) {
        if (!active) {
          this.changeMoney(res.detail[0].assetName)
        } else {
          this.getWithdrawParameter()
        }
      }
    })
  }

  changeMoney = (payload) => {
    this.changeState({ active: payload },
      () => {
        this.getWithdrawParameter()
      }
    )
  }

  getWithdrawParameter = () => {
    const { dispatch, modelName } = this.props
    const { active, } = this.state
    if (active) {
      dispatch({
        type: `${modelName}/getWithdrawParameter`,
        payload: {
          asset: active
        }
      })
    }
  }


  checkAmount = (value, selectOne) => {
    const { changeState } = this
    if (Patterns.decimalNumber.test(value)) {
      if (value < Number(selectOne.minAmount)) {
        changeState({
          amountMsg: `最小提现数量${selectOne.minAmount}`
        })
      } else if (value > Number(selectOne.maxAmount)) {
        changeState({
          amountMsg: '可提现金额不足'
        })
      } else {
        changeState({
          amountMsg: ''
        })
      }
    } else {
      changeState({
        amountMsg: ''
      })
    }
  }


  render() {
    const { changeState, } = this
    const { model: { detail = [], }, user: { userInfo: { email = '' } = {} } = {}, modal: { name }, loading, modelName } = this.props
    const { active, googleCode, emailVerificationCode } = this.state
    const selectList = detail.map((item = {}) => ({ label: item.assetName, value: item.assetName }))

    const selectOne = detail.filter((item = {}) => item.assetName === active)[0] || {}
    const isNotAllow = () => {
      return selectOne.allowWithdraw === false || selectOne.isValid === false
    }
    return (
      <Mixin.Child that={this} >
        <div className={styles.Buy} >
          <div className={styles.title} >买入数字货币</div >
          <div className={styles.moneytype} >
            币种
            <div className={styles.select} >
              <MoneySelect
                onChange={(option = {}) => {
                  this.changeMoney(option.value)
                  changeState({
                    addressMsg: '',
                    address: '',
                    amountMsg: '',
                    amount: '',
                  })
                }}
                value={selectList.filter((item = {}) => item.value === active)}
                options={selectList}
              />
            </div >
          </div >
          <ul className={styles.userinput} >
            <li >
              <div className={styles.label} >汇率</div >
              <div >
                1BTC ≈ 6543.21 人民币
              </div >
            </li >
            <li >
              <div className={styles.label} >实名认证</div >
              <div >
                某某
              </div >
            </li >
            <li >
              <div className={styles.label} >我要买</div >
              <div className={styles.input} >
                <Input
                  placeholder={''}
                  value={emailVerificationCode}
                  onChange={(value) => {
                    changeState({ emailVerificationCode: value })
                  }} >
                </Input >
              </div >
            </li >
            <li className={styles.inputbutton} >
              <div className={styles.label} ></div >
              <div className={
                classNames(
                  styles.button,
                  (email && googleCode && emailVerificationCode) ? styles.permit : null
                )
              } >
                <Button
                  loading={loading.effects[`${modelName}/doWithdrawApply`]}
                  onClick={() => {
                  }} >
                  去支付
                </Button >
              </div >
            </li >
          </ul >
          <div >hahah</div >
        </div >
      </Mixin.Child >
    )
  }
}




