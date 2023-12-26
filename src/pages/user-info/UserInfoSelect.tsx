import { getUsers } from "../../services/firebase/user-service";
import { db } from "../../services/firebase";
import { useQuery } from "react-query";
import UserSelect from "../emotion-select/UserSelect";
import { useNavigate } from "react-router-dom";

export default function UserInfoSelect({ userId }: { userId: string }) {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: "users",
    queryFn: () => getUsers(db),
  });
  const navigate = useNavigate();
  if (isLoading || isFetching || isError) {
    return null;
  }

  return (
    <UserSelect
      selectedUserId={userId ?? ""}
      users={data}
      onChangeUser={(id) =>
        navigate(`/user-info/${id}`, {
          replace: true,
        })
      }
    />
  );
}
