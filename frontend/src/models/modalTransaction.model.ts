export interface MODAL_TRANSACTION {
    open: boolean;
    onClose: () => void;
    data?: any;
    callback: (data: any) => {};
}