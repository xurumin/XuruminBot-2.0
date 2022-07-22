import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";

interface IPlugin {
  onLoad?(): Promise<void>;
  run(): Promise<void>;

  default: {
    name: string;
    slash: RESTPostAPIApplicationCommandsJSONBody[];
  };
}

// interface IInteraction {
//     type: number;
//     id: string;
//     applicationId: string;
//     guildId: string;
//     user: {
//         id: string,
//         bot: boolean,
//         system: boolean,
//         flags: UserFlagsBitField { bitfield: 64 },
//         username: 'jnaraujo',
//         discriminator: '8090',
//         avatar: '275d8155b1db33c48c04a18130f9e8c8',
//         banner: undefined,
//         accentColor: undefined
//     }
// }

export type { IPlugin };
