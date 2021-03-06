class V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /users or /users.json
  def index
    id = Hashids.new("greater salt", 8).decode(params[:meeting_id]).try(:first)
    @meeting = Meeting.find(id)
    @users = @meeting.users.all
    render json: @users
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # POST /users or /users.json
  def create
    meeting = Hashids.new("greater salt", 8).decode(params[:meeting_id]).try(:first)
    updated_params = user_params.merge(meeting_id: meeting)
    @user = User.new(updated_params)

    if @user.save
      render json: {
        success: 'user created succesfully'
      }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy
    render json: {
      success: 'user deleted succesfully'
    }
  end

  def update
    meeting = Hashids.new("greater salt", 8).decode(params[:meeting_id]).try(:first)
    @user = User.find(params[:id])
    @user.selected = user_params[:selected]

    if @user.save
      render json: {
        success: 'user updated succesfully'
      }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :meeting_id, :selected)
    end
end
