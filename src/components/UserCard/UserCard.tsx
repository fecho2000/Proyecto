import type { User } from "../../types";
import "./_user-card.scss";

type Props = { user: User };

export default function UserCard({ user }: Props) {
  const initials = `${user.name[0]}${user.lastName[0]}`;

  return (
    <div className="user-card">
      <div className="user-card__header">
        <div className="user-card__avatar">{initials}</div>
        <h2 className="user-card__name">
          {user.name} {user.lastName}
        </h2>
      </div>
      <p className="user-card__birthday">
        Fecha de nacimiento: <strong>{user.birthDay}</strong>
      </p>
    </div>
  );
}