import Select from "../../components/forms/inputs/Select";
import { type DocumentData, type QuerySnapshot } from "firebase/firestore";
import { type User } from "../../services/firebase/types";

export default function UserSelect({
  selectedUserId,
  users,
  onChangeUser,
}: {
  selectedUserId: string;
  users?: QuerySnapshot<User, DocumentData>;
  onChangeUser: (userId: string) => void;
}) {
  return (
    <Select
      value={selectedUserId ?? undefined}
      onChange={(e) => {
        onChangeUser(e.target.value);
      }}
    >
      {users?.docs.map((doc) => {
        const data = doc.data();
        return (
          <option value={doc.id} key={doc.id}>
            {data.name}
          </option>
        );
      })}
    </Select>
  );
}
