import React, { Component } from 'react'
import { connect } from 'dva'
import { COLORS } from "@constants"
import { Mixin, } from '@components'
import { classNames, _, } from '@utils'
import { triangle2 } from '@assets'
import MoneySelect from './components/MoneySelect'

import styles from './index.less'

@connect(({ modal, Loading }) => ({
  modal,
  loading: Loading
}))
export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    console.log('存款')
  }


  render() {
    const selectList = [
      { label: 'BTC', value: 'BTC' },
      { label: 'USD', value: 'USD' },
    ]
    return (
      <Mixin.Child that={this} >
        <div className={styles.deposit} >
          <div className={styles.title} >存款</div >

          <div className={styles.moneytype} >
            币种
            <div className={styles.select} >
              <MoneySelect
                value={selectList[0]}
                options={selectList}
              />
            </div >
          </div >
          <div className={styles.address} >你的个人多重签名BTC存款地址</div >
          <div className={styles.letter} >
            18XAJd41s3xPYeQberLVEwUHPq1RVUdzmH
            <div >复制</div >
          </div >
          <div className={styles.img} >
            <img src={'http://pade1vej8.bkt.clouddn.com/1.JPG'} />
          </div >
          <div className={styles.desc} >
            <div >重要提示</div >
            * 请不要向上述地址充值任何非BTC资产，否则将不可找回。<br />
            * 最低存款额为 0.001BTC (100000 聪)。<br />
            * 你的比特币会在6个网络确认后到帐。<br />
            * 所有Hopex的存款地址都是多重签名冷钱包地址，所有钱包均不曾被联网的机器读取。
          </div >
        </div >
      </Mixin.Child >
    )
  }
}

