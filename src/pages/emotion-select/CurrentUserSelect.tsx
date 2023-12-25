import { getUsers } from "../../services/firebase/user-service";
import { db } from "../../services/firebase";
import Select from "../../components/forms/inputs/Select";
import { useQuery } from "react-query";
import { useCurrentUser } from "../../services/local-storage/current-user";

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
    <Select
      value={userId ?? undefined}
      onChange={(e) => {
        setUserId(e.target.value);
      }}
    >
      {data?.docs.map((doc: any) => {
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
