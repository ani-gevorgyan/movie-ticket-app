import { Transform } from 'class-transformer';

export const TransformToLowerCase = () =>
  Transform(({ value }: { value?: string }) => value?.toLowerCase());
