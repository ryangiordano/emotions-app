import { getUsers } from "../../services/firebase/user-service";
import { db } from "../../services/firebase";
import { useQuery } from "react-query";
import { useCurrentUser } from "../../services/local-storage/current-user";
import UserSelect from "./UserSelect";

export default function CurrentUserSelect() {
  const { data } = useQuery({
    queryKey: "users",
    queryFn: () => {
      return getUsers(db);
    },
  });
  const { userId, setUserId } = useCurrentUser();

  return (
    <UserSelect
      selectedUserId={userId ?? ""}
      users={data}
      onChangeUser={setUserId}
    />
  );
}
