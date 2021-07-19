import { PersonalInfo } from '../../domain/participant/personalInfo';
import { ParticipantName } from '../../domain/participant/participantName';
import { MailAddress } from '../../domain/participant/mailAddress';

export const dummyPersonalIfo1 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '山田太郎' }),
  mailAddress: MailAddress.create({ mailAddress: 'yamada@gmail.com' }),
});
export const dummyPersonalIfo2 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '鈴木為三' }),
  mailAddress: MailAddress.create({ mailAddress: 'suzuki@gmail.com' }),
});
export const dummyPersonalIfo3 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '近衛晴彦' }),
  mailAddress: MailAddress.create({ mailAddress: 'konoe@gmail.com' }),
});
export const dummyPersonalIfo4 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '田中翔太' }),
  mailAddress: MailAddress.create({ mailAddress: 'tanaka@gmail.com' }),
});
export const dummyPersonalIfo5 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '坂本真彦' }),
  mailAddress: MailAddress.create({ mailAddress: 'sakamoto@gmail.com' }),
});
export const dummyPersonalIfo6 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '山本一太' }),
  mailAddress: MailAddress.create({ mailAddress: 'yamamoto@gmail.com' }),
});
export const dummyPersonalIfo7 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '小野寺雅士' }),
  mailAddress: MailAddress.create({ mailAddress: 'onodera@gmail.com' }),
});
export const dummyPersonalIfo8 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '88888' }),
  mailAddress: MailAddress.create({ mailAddress: '88888a@gmail.com' }),
});
export const dummyPersonalIfo9 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '99999' }),
  mailAddress: MailAddress.create({ mailAddress: '99999@gmail.com' }),
});
