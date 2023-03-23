import { Close } from '@mui/icons-material';

export const Header = ({
  setShowChatBot = () => { }
}) => {
  return (
    <div className="rcb-header">
      <h2 className="rcb-header-title">Code Ninja Support</h2>
      <a className="rcb-header-close" onClick={() => setShowChatBot(false)}>
        <Close />
      </a>
    </div>
  );
}
