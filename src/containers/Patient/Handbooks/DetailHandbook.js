import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeHeader';
import './DetailHandbook.scss'
class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, precState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }


    render() {

        return (
            <div className='handbook-container'>
                <HomeHeader />
                <div className='handbook-content'>
                    <div className='banner'></div>
                    <div className='date'>Cập nhật: 08:20 - Thứ 2, Ngày 10 Tháng 2 Năm 2022 </div>
                    <div className='text-content'>
                        <h1>Cẩm nang phòng, chống COVID-19 tại nhà</h1>
                        <p>Hiện nay có hơn 80% các ca mắc COVID-19 đều không có triệu chứng hoặc có triệu chứng nhẹ. Do đó, người mắc COVID-19 hoàn toàn có thể tự khỏi mà không cần can thiệp từ lực lượng y tế. Tự cách ly và điều trị tại nhà là mô hình chăm sóc sức khỏe hiệu quả trong công tác phòng, chống dịch COVID-19 lâu dài, người bệnh dưới sự giám sát thường xuyên và có sự hỗ trợ từ lực lượng y tế kịp thời góp phần giảm tải áp lực cho ngành y tế; giúp kiểm soát dịch bệnh trong trạng thái bình thường mới; tập trung nguồn lực cho hoạt động dự phòng và tiêm vắc xin toàn dân</p>
                        <p>Sở Y tế, Trung tâm Kiểm soát bệnh tật Thành phố (HCDC) phối hợp cùng Đài Truyền hình Thành phố Hồ Chí Minh (HTV) thực hiện một chuỗi chuyên đề “Cẩm nang phòng, chống COVID-19 tại nhà”. Người xem sẽ được cung cấp các kiến thức về phòng, chống COVID-19 từ các chuyên gia trong ngành Y tế về các vấn đề đang được quan tâm hiện nay. Chuỗi chuyên đề được thực hiện và phát sóng trên đài truyền hình HTV.</p>
                    </div>

                </div>
                <HomeFooter />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);