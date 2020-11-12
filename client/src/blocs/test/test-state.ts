import { BlocState } from '@src/modules/react-bloc';

export abstract class TestState extends BlocState {}

export class Initial extends TestState {}

export class Alternative extends TestState {}
