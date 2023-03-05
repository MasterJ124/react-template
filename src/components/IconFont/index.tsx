import { createFromIconfontCN } from '@ant-design/icons';
import PropTypes from 'prop-types';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3829089_e4x74xub4jr.js', // 在 iconfont.cn 上生成
});

IconFont.propTypes = {
  //图标
  type: PropTypes.string.isRequired,
  //样式
  style: PropTypes.object,
  //提示
  title: PropTypes.any,
  //样式类名
  className: PropTypes.any,
};

export default IconFont;
