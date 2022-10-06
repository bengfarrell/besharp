export class ModalEvent extends Event {
    static TRIGGER_MODAL_OPEN = 'triggerModalOpen';

    static TRIGGER_MODAL_CLOSE = 'triggerModalClose';

    modalName;
    options;

    constructor(modalname, options, type, initObj) {
        super(type, initObj);
        this.options = options;
        this.modalName = modalname;
    }
}