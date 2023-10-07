import db from '../db/database';
import Match from './match';
import Target from './target';
import Player from './player';

const PlayerTarget = db.define('PlayerTarget', {
    
});
PlayerTarget.belongsTo(Player, { foreignKey: 'idPlayer' });
PlayerTarget.belongsTo(Target, { foreignKey: 'idTarget' });
PlayerTarget.belongsTo(Match, { foreignKey: 'idMatch' });
export default PlayerTarget;