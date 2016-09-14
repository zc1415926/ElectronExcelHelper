/**
 * Created by zc1415926 on 2016/9/14.
 */
var React = require('react');

var Modal = require('react-modal-bootstrap').Modal;
var ModalHeader = require('react-modal-bootstrap').ModalHeader;
var ModalTitle = require('react-modal-bootstrap').ModalTitle;
var ModalClose = require('react-modal-bootstrap').ModalClose;
var ModalBody = require('react-modal-bootstrap').ModalBody;
var ModalFooter = require('react-modal-bootstrap').ModalFooter;

var TdRhjxxDescribeModal = React.createClass({

    getInitialState: function () {
        return {
            isOpen: this.props.isOpen,
        };
    },

    shouldComponentUpdate: function (nextProps) {
        if(nextProps['isOpen']){
            this.state.isOpen=nextProps['isOpen'];
        }
        return this.state.isOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        if(!this.state.isOpen){
            this.props.closeModal();
        }
    },

    hideModal:function () {
        this.setState({isOpen: false});
    },

    render: function () {
        return (
            <div>
                <div className="container">
                    <Modal isOpen={this.state.isOpen}  size="modal-lg" onRequestHide={this.hideModal}>
                        <ModalHeader>
                            <ModalClose onClick={this.hideModal}/>
                            <ModalTitle>重庆天地人和街小学课表转换说明</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <p>天地的课表在导出时要勾选“显示班级”和“显示完整名称。
                                <img src="../app/img/tdRhjxxOutputTip.jpg" width="860px"/></p>
                            <p>天地的源课表如下：
                                <img src="../app/img/tdRhjxxSchedule_source.jpg" width="860px"/></p>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-primary btn-lg' onClick={this.hideModal}>
                                确定
                            </button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
});

module.exports = TdRhjxxDescribeModal;