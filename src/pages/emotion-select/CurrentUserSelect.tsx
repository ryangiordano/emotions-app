import { getUsers } from "../../services/firebase/user-service";
import { db } from "../../services/firebase";
import Select from "../../components/forms/inputs/Select";
import { useQuery } from "react-query";
import { useCurrentUser } from "../../services/local-storage/current-user";
import UserSelect from "./UserSelect";

export default function CurrentUserSelect() {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: "users",
    queryFn: () => {
      return getUsers(db);
    },
  });
  const { userId, setUserId } = useCurrentUser();

  if (isLoading || isFetching || isError) {
    return null;
  }

  return (
    <UserSelect
      selectedUserId={userId ?? ""}
      users={data}
      onChangeUser={setUserId}
    />
  );
}