import { Button, Modal } from 'antd';
import { CreateWrapper, CreateAsyncWrapper } from '@siroi/create-react-wrapper';
import { FC, useState } from 'react';
import { Root } from 'react-dom/client';
import 'antd/dist/antd.less';

const Modal1: FC<{ show: boolean; root?: Root; name: string }> = (props) => {
    const { show, root, name } = props;
    const [open, setOpen] = useState<boolean>(show);

    const unmount = () => {
        setOpen(false);
        setTimeout(() => {
            root?.unmount();
        }, 500);
    };

    return (
        <Modal open={open} onCancel={unmount} onOk={unmount}>
            {name}
        </Modal>
    );
};

const Modal2 = () => {};

const showModal = CreateWrapper({
    element: Modal1,
    wrapperClassName: 'siroi-modal',
});

const Index = () => {

    return <Button onClick={
        () => {
            showModal({show: true, name: '1234'});
            showModal({show: true, name: '12345'});
        }
    }>click me!</Button>;
};

export { showModal, Index };
