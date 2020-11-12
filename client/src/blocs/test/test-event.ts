import { BlocEvent } from '@src/modules/react-bloc';

export abstract class TestEvent extends BlocEvent {}

export class Toggle extends TestEvent {}
