import { classNames } from 'shared/lib/classNames';

describe('classNames', () => {
  it('should return only the class name when no additional classes or modifiers are provided', () => {
    const result = classNames('class1');
    expect(result).toBe('class1');
  });

  it('should handle an empty modifiers object', () => {
    const result = classNames('class1', {});
    expect(result).toBe('class1');
  });

  it('should handle an empty additional classes array', () => {
    const result = classNames('class1', {}, []);
    expect(result).toBe('class1');
  });

  it('should concatenate the class name and additional classes when no modifiers are provided', () => {
    const result = classNames('class1', {}, ['class2', 'class3']);
    expect(result).toBe('class1 class2 class3');
  });

  it('should concatenate the class name, additional classes and modifiers when modifiers are provided', () => {
    const result = classNames('class1', { mod1: true, mod2: false }, ['class2', 'class3']);
    expect(result).toBe('class1 class2 class3 mod1');
  });
});
