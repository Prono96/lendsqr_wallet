import { createUser } from '../../model/user';
import db from '../../database'; 

jest.mock('../../database', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    insert: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([1])
  }))
}));

describe('createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('should create a new user', async () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const result = await createUser(user);

    expect(result).toBe({ userId: 1 });
    
    // Verify that the mock insert function was called with the correct arguments
    const mockDbInstance = db();
    expect(mockDbInstance.insert).toHaveBeenCalledWith(user);
    expect(mockDbInstance.returning).toHaveBeenCalledWith('id');
  });

  
});
