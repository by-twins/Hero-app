import React, { useState, useMemo } from 'react';
import { User, Kid, View, Behavior, Reward, PointEvent, GrantedRewardEvent } from './types';
import { INITIAL_KIDS, INITIAL_BEHAVIORS, INITIAL_REWARDS } from './constants';
import LoginScreen from './components/LoginScreen';
import ParentDashboard from './components/ParentDashboard';
import ChildView from './components/ChildView';
import { FamilyDataContext } from './hooks/useFamilyData';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [kids, setKids] = useState<Kid[]>(INITIAL_KIDS);
  const [behaviors, setBehaviors] = useState<Behavior[]>(INITIAL_BEHAVIORS);
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);

  const assignPoints = (kidId: string, behaviorId: string) => {
    const behavior = behaviors.find(b => b.id === behaviorId);
    if (!behavior) return;

    const newPointEvent: PointEvent = {
      id: `evt-${Date.now()}`,
      behaviorId: behavior.id,
      timestamp: Date.now(),
      points: behavior.points,
    };

    setKids(prevKids =>
      prevKids.map(kid =>
        kid.id === kidId
          ? { ...kid, points: kid.points + behavior.points, history: [...kid.history, newPointEvent] }
          : kid
      )
    );
  };
  
  const redeemReward = (kidId: string, reward: Reward) => {
      const newGrantedReward: GrantedRewardEvent = {
        id: `grant-${Date.now()}`,
        rewardId: reward.id,
        timestamp: Date.now(),
        grantedBy: 'redeem',
    };
    
      setKids(prevKids => prevKids.map(kid => 
          kid.id === kidId ? {
              ...kid, 
              points: kid.points - reward.cost,
              rewardHistory: [...(kid.rewardHistory || []), newGrantedReward]
            } : kid
      ));
  };
  
  const grantReward = (kidId: string, rewardId: string) => {
    const newGrantedReward: GrantedRewardEvent = {
        id: `grant-${Date.now()}`,
        rewardId,
        timestamp: Date.now(),
        grantedBy: 'parent',
    };

    setKids(prevKids =>
      prevKids.map(kid =>
        kid.id === kidId
          ? { ...kid, rewardHistory: [...(kid.rewardHistory || []), newGrantedReward] }
          : kid
      )
    );
  };

  const addKid = (name: string, avatar: string) => {
    const newKid: Kid = {
      id: `kid-${Date.now()}`,
      name,
      avatar,
      points: 0,
      history: [],
      rewardHistory: [],
    };
    setKids(prevKids => [...prevKids, newKid]);
  };

  const editKid = (kidId: string, newName: string, newAvatar: string) => {
    setKids(prevKids => prevKids.map(kid => 
        kid.id === kidId ? { ...kid, name: newName, avatar: newAvatar } : kid
    ));
  };

  const deleteKid = (kidId: string) => {
    setKids(prevKids => prevKids.filter(kid => kid.id !== kidId));
  };
  
  const updateKidAvatar = (kidId: string, avatarUrl: string) => {
    setKids(prevKids => prevKids.map(kid => 
        kid.id === kidId ? { ...kid, avatar: avatarUrl } : kid
    ));
  };

  const dataContextValue = useMemo(() => ({
    kids,
    setKids,
    behaviors,
    setBehaviors,
    rewards,
    setRewards,
    assignPoints,
    redeemReward,
    grantReward,
    currentUser,
    setCurrentUser,
    addKid,
    editKid,
    deleteKid,
    updateKidAvatar,
  }), [kids, behaviors, rewards, currentUser]);

  const renderContent = () => {
    if (!currentUser) {
      return <LoginScreen />;
    }
    if (currentUser.role === 'parent') {
      return <ParentDashboard />;
    }
    const currentKid = kids.find(k => k.id === currentUser.id);
    if (currentKid) {
      return <ChildView kid={currentKid} />;
    }
    // Fallback to login if child not found
    setCurrentUser(null);
    return <LoginScreen />;
  };

  return (
    <FamilyDataContext.Provider value={dataContextValue}>
      <div className="min-h-screen bg-gray-100 font-sans text-brand-dark">
        {renderContent()}
      </div>
    </FamilyDataContext.Provider>
  );
};

export default App;