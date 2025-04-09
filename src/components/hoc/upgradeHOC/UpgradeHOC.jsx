import { useContext, useEffect } from 'react';
import { DashboardContext, AppContext } from 'src/context/contexts';

const UpgradeHOC = (WrappedComponent) => {
    // eslint-disable-next-line
    return (props) => {
        const { setIsUpgradeModalOpen } = useContext(DashboardContext);
        const {
            user: { hasSubscription, trial_extend_status },
        } = useContext(AppContext);

        useEffect(() => {
            if (!hasSubscription && !trial_extend_status) {
                setIsUpgradeModalOpen(true);
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default UpgradeHOC;
