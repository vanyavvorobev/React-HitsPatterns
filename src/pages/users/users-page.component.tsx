import { Link, useParams } from "react-router-dom";
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { useUsersService } from "../../domain/users/users.service";
import "./users-page.component.css";
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { useProfileService } from "../../domain/profile/profile.service";
import { SpinnerComponent } from "../../shared/ui/spinner/spinner.component";
import { motion } from "framer-motion";

const UsersPageComponent = () => {
	const { users } = useUsersService();
	const { profileInfo } = useProfileService(localStorage.getItem("user-id"));
	const { userId } = useParams();

	return (
		<div className={'users-page-component'}>
			<div className="users-page-component__wrapper">
				<h3 className="users-page-component__title">Пользователи</h3>
				<div className="users-page-component__list">
					{users?.map(it => (
						<Link 
							key={it.id} 
							className={`no-decoration`} 
							to={`/users/${it.id}`} 
							replace={userId !== undefined}
						>
							<UserCardComponent 
								id={it.id}
								fullName={it.fullName}
								email={it.email}
								role={it.role}
								isBanned={it.isBanned}
							/>
						</Link>
					))}
				</div>
			</div>

			<motion.div className="users-page-component__divider"/>

			<motion.div className="users-page-component__wrapper">
				{profileInfo 
					?<UserFormComponent userId={userId}/>
					:<SpinnerComponent/>
				}
			</motion.div>
		</div>
	)
}

export default UsersPageComponent;