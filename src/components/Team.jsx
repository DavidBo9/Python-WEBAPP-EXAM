// Team.jsx
import React from "react";

const Team = ({ team }) => {
  return (
    <div className="team">
      <h2>Team</h2>
      <div className="team-members">
        {team &&
          Array.isArray(team) &&
          team.map((member, index) => (
            <div key={index}>
              {member && member.sprites && (
                <img src={member.sprites.front_default} alt={member.name} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Team;
