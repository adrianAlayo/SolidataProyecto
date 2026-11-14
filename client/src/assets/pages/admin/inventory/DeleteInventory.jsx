import RecordManagement from "../RecordManagement.jsx";

export function DeleteInventories() {
    return <RecordManagement entity="inventory" mode="delete" />;
}

export default DeleteInventories;
