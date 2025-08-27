import { describe, it, expect } from 'vitest';
import { trucateText } from '../common'; // adjust the path as needed

describe('truncateText', () => {
  it('returns original text if length is within limit', () => {
    const result = trucateText('Hello', 10);
    expect(result).toBe('Hello');
  });

  it('truncates text and adds ellipsis if length exceeds limit', () => {
    const result = trucateText('Hello, world!', 5);
    expect(result).toBe('Hello...');
  });

  it('returns empty string with ellipsis if maxLength is 0', () => {
    const result = trucateText('Hello', 0);
    expect(result).toBe('...');
  });

  it('handles empty input string', () => {
    const result = trucateText('', 5);
    expect(result).toBe('');
  });

  it('handles exact length match', () => {
    const result = trucateText('Hello', 5);
    expect(result).toBe('Hello');
  });
});
