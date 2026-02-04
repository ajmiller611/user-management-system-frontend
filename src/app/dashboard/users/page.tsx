/**
 * UsersPage
 *
 * Serves as the dashboard page for managing users.
 * Renders the UsersTable component which handles
 * fetching, editing, and deleting users.
 */
import UserTable from '@/components/UsersTable';

export default function UsersPage() {
  return <UserTable />;
}
