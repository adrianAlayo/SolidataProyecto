import RecordManagement from "../RecordManagement.jsx";

export function DeleteUsers() {
    return <RecordManagement entity="user" mode="delete" />;
}

export default DeleteUsers;
